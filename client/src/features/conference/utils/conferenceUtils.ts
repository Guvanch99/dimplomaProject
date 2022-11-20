import { MutableRefObject } from 'react'
import { v4 as uuidv4 } from 'uuid'

const servers = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302'
      ]
    }
  ]
}

type TCreatePeerProps = {
  peer: MutableRefObject<RTCPeerConnection | null>,
  stream: MediaStream,
  client: any,
  setStatusStream?: () => void,
  streamID?: string,
  streamType?: string
}

export async function createPeer(
  {
    peer,
    stream,
    client,
    setStatusStream,
    streamID,
    streamType
  }: TCreatePeerProps
) {
  peer.current = new RTCPeerConnection(servers)

  stream.getTracks().forEach((track) => {
    peer.current!.addTrack(track)
  })
  peer.current.onicecandidate = (event) => {
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate
      const iceParams = {
        id: uuidv4(),
        type: 'ICE_EXCHANGE',
        payload: {
          candidate,
          sdpMid,
          sdpMLineIndex,
          master: true
        }
      }
      console.log('iceCandidate sended ', {
        topic: `connect/${streamID}/client`,
        data: iceParams
      })
      client.publish(`connect/${streamID}/client`, JSON.stringify(iceParams), { qos: 0 })
    }
  }

  peer.current!.oniceconnectionstatechange = () => {
    const iceConnectionStatus = peer.current?.iceConnectionState
    if (iceConnectionStatus === 'connected') {
      // TODO userChannel both camera
      const preparedData = {
        id: streamID,
        type: 'START_STREAM',
        payload: {
          type: streamType
        }
      }
      console.log('START_STREAM send ', {
        topic: `connect/${streamID}/client`,
        data: preparedData
      })
      client.publish(`connect/${streamID}/client`, JSON.stringify(preparedData), { qos: 0 })
      if (setStatusStream) {
        setStatusStream()
      }
    }
  }
  await createOffer(peer, streamID!, client)
  return peer
}

export async function createOffer(
  peerRef: MutableRefObject<RTCPeerConnection | null>,
  streamID: string,
  client: any
) {
  const peerConnection = peerRef.current!
  const offer = await peerConnection.createOffer()
  const sdp = {
    id: uuidv4(),
    type: 'OFFER',
    payload: {
      sdp: updateBandwidthRestriction(offer.sdp, '10000'),
      master: true

    }
  }

  console.log('offer', sdp)
  peerConnection.setLocalDescription(offer).then(() => {
    console.log('offer send', {
      topic: `connect/${streamID}/client`,
      data: sdp
    })
    client.publish(`connect/${streamID}/client`, JSON.stringify(sdp), { qos: 0 })
  })
}

export function removeBandwidthRestriction(sdp?: string) {
  return sdp?.replace(/b=AS:.*\r\n/, '').replace(/b=TIAS:.*\r\n/, '')
}

function updateBandwidthRestriction(sdp: any, bandwidth: any) {
  const modifier = 'AS'
  // if (adapter.browserDetails.browser === 'firefox') {
  //   bandwidth = (bandwidth >>> 0) * 1000
  //   modifier = 'TIAS'
  // }
  if (sdp.indexOf(`b=${modifier}:`) === -1) {
    // insert b= after c= line.
    // eslint-disable-next-line no-param-reassign
    sdp = sdp.replace(/c=IN (.*)\r\n/, `c=IN $1\r\nb=${modifier}:${bandwidth}\r\n`)
  } else {
    // eslint-disable-next-line no-param-reassign
    sdp = sdp.replace(new RegExp(`b=${modifier}:.*\r\n`), `b=${modifier}:${bandwidth}\r\n`)
  }
  return sdp
}
