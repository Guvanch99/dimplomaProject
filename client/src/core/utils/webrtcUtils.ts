import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

type TCreateRTCSession = {
  roomId: string,
  rtcSessionId: string,
  sendMessage: (message: any) => void
}

type TStartStream = {
  localStream: any
  localVideoTag: any
}

type TCreateRTCEndpoint = {
  id: string
  sendMessage: any
  peers: Map<any, any>,
  setPeers: Dispatch<SetStateAction<Map<any, any>>>
  localStream: any,
  setPeersId: any
}

const configuration = {
  iceServers: [{
    urls: ['stun:stun.l.google.com:19302',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
      'stun:stun3.l.google.com:19302',
      'stun:stun4.l.google.com:19302']
  }]
}

export function startStream({ localStream, localVideoTag }: TStartStream) {
  return navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then((stream) => {
    console.log('local 37', localStream)
    // eslint-disable-next-line no-param-reassign
    localStream.current = stream
    console.log('LOCAL STREAM: ', stream)
    localVideoTag.current.srcObject = stream
    // localVideoTag.current.play()
    return stream
  })
}

export function createRTCSession({ roomId, rtcSessionId, sendMessage }: TCreateRTCSession) {
  const createSessionAction = {
    type: 'CREATE_RTC_SESSION',
    payload: {
      requestId: Math.random(),
      roomId,
      rtcSessionId
    }
  }
  console.log('has been Send', {
    createSessionAction
  })
  sendMessage(createSessionAction)
}

export function createRTCEndpoint({
  id,
  sendMessage,
  setPeers,
  peers,
  localStream,
  setPeersId
}: TCreateRTCEndpoint) {
  const peer = new RTCPeerConnection(configuration)
  const peerId = `${id}`
  setPeers(new Map(peers.set(peerId, peer)))
  setPeersId((prev: any) => [...prev, peerId])

  peer.onicecandidate = (e) => {
    const { candidate } = e
    if (candidate) {
      const action = {
        type: 'ICE_EXCHANGE',
        payload: {
          endpointId: peerId,
          candidate: candidate.candidate,
          sdpMid: candidate.sdpMid,
          sdpMLineIndex: candidate.sdpMLineIndex
        }

      }

      sendMessage(action)
    }
  }

  peer.ontrack = async (e) => {
    const remoteVideo: HTMLElement | null = document.getElementById(peerId)
    console.log('remoteVideo', remoteVideo)
    console.log('REMOTE STREAM: ', e)
    if (remoteVideo) {
      // @ts-ignore
      // eslint-disable-next-line prefer-destructuring
      remoteVideo.srcObject = e.streams[0]
    }
  }

  localStream.current?.getTracks().forEach((track: any) => peer.addTrack(track, localStream))

  peer.createOffer()
    .then(async (offer) => {
      const { sdp } = offer
      await peer.setLocalDescription(offer)
      const action = {
        type: 'SDP_EXCHANGE',
        payload: {
          endpointId: peerId,
          sdp
        }
      }

      sendMessage(action)
    })

  return peer
}
//

// function changeVideoCodec(pc: any, mimeType: any) {
//   const transceivers = pc.getTransceivers()
//   const senders = pc.getSenders()
//   let codecs
//   // eslint-disable-next-line no-restricted-syntax
//   for (const sender of senders) {
//     if (sender.track.kind === 'video') {
//       const codecList = sender.getParameters().codecs
//       console.log('CODELIST: ', codecList)
//       codecs = codecList
//       break
//     }
//   }
//
//   transceivers.forEach((transceiver: any) => {
//     const { kind } = transceiver.sender.track
//     // @ts-ignore
//     let sendCodecs = RTCRtpSender.getCapabilities(kind).codecs
//     // @ts-ignore
//     let recvCodecs = RTCRtpReceiver.getCapabilities(kind).codecs
//
//     console.log('SENDCODECS : ', sendCodecs)
//
//     if (kind === 'video') {
//       sendCodecs = preferCodec(sendCodecs, mimeType)
//       recvCodecs = preferCodec(recvCodecs, mimeType)
//       transceiver.setCodecPreferences([...sendCodecs, ...recvCodecs])
//     }
//   })
// }
//
// function preferCodec(codecs: any, mimeType: any) {
//   const otherCodecs: any = []
//   const sortedCodecs: any = []
//
//   codecs.forEach((codec: any) => {
//     if (codec.mimeType === mimeType) {
//       sortedCodecs.push(codec)
//     } else {
//       otherCodecs.push(codec)
//     }
//   })
//
//   return sortedCodecs.concat(otherCodecs)
//   // return sortedCodecs;
// }
//
type TCreateRoom = {
  localStream: any,
  localVideoTag: any,
  roomId: string,
  rtcSessionId: string,
  sendMessage: (message: any) => void
}

export async function createRoom({
  localStream,
  localVideoTag,
  roomId,
  rtcSessionId,
  sendMessage
}: TCreateRoom) {
  const createRoomAction = {
    type: 'CREATE_ROOM',
    payload: {
      requestId: Math.random(),
      roomId
    }
  }
  sendMessage(createRoomAction)
  startStream({ localStream, localVideoTag }).then(() =>
    createRTCSession({ roomId, rtcSessionId, sendMessage }))
}

export function joinRoom({ localStream,
  localVideoTag,
  roomId,
  rtcSessionId,
  sendMessage }: TCreateRoom) {
  startStream({ localStream, localVideoTag }).then(() => {
    createRTCSession({ roomId, rtcSessionId, sendMessage })
    const joinRoomAction = {
      type: 'JOIN_ROOM',
      payload: {
        requestId: Math.random(),
        roomId,
        rtcSessionId
      }
    }
    sendMessage(joinRoomAction)
  })
}
//
// function setupReceiverTransform(receiver: any) {
//   const receiverStreams = receiver.createEncodedStreams()
//
//   const readableStream = receiverStreams.readable || receiverStreams.readableStream
//   const writableStream = receiverStreams.writable || receiverStreams.writableStream
//
//   const transformStream = new TransformStream({
//     transform: decodeFunction
//   })
//   readableStream
//     .pipeThrough(transformStream)
//     .pipeTo(writableStream)
// }
//
// function decodeFunction(encodedFrame: any, controller: any) {
//   const view = new DataView(encodedFrame.data)
//   // console.log("[DECODE]: ", encodedFrame.data);
//
//   const newData = new ArrayBuffer(encodedFrame.data.byteLength - 5)
//   const newView = new DataView(newData)
//   // @ts-ignore
//   const cryptoOffset = frameTypeToCryptoOffset[encodedFrame.type]
//
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < cryptoOffset; ++i) {
//     newView.setInt8(i, view.getInt8(i))
//   }
//   // eslint-disable-next-line no-plusplus
//   for (let i = cryptoOffset; i < encodedFrame.data.byteLength - 5; ++i) {
//     // newView.setInt8(i, view.getInt8(i) - 1);
//     const value = 0
//     // if (crypto_key) {
//     //   value = +crypto_key
//     // }
//
//     newView.setInt8(i, view.getInt8(i) - value)
//   }
//   encodedFrame.data = newData
//   // console.log("[DECODE]: result", newData);
//
//   controller.enqueue(encodedFrame)
// }
//
// const frameTypeToCryptoOffset = {
//   key: 10, // key frame (i frame)
//   delta: 3, // delta frame (p, b frame - inter frame)
//   undefined: 1
// }
//
// function setupSenderTransform(sender: any) {
//   const senderStreams = sender.createEncodedStreams()
//
//   const readableStream = senderStreams.readable || senderStreams.readableStream
//   const writableStream = senderStreams.writable || senderStreams.writableStream
//
//   const transformStream = new TransformStream({
//     transform: encodeFunction
//   })
//
//   readableStream
//     .pipeThrough(transformStream)
//     .pipeTo(writableStream)
// }
//
// function encodeFunction(encodedFrame: any, controller: any) {
//   const frameType = encodedFrame.type
//   // let deltaOrKeyFrame = frameType === 'key';
//   const deltaOrKeyFrame = false
//   if (deltaOrKeyFrame) {
//     console.log('[ENCODE]: ', encodedFrame.data)
//   }
//
//   const view = new DataView(encodedFrame.data)
//   // Any length that is needed can be used for the new buffer.
//   const newData = new ArrayBuffer(encodedFrame.data.byteLength + 5)
//   const newView = new DataView(newData)
//
//   // @ts-ignore
//   const cryptoOffset = frameTypeToCryptoOffset[frameType as any]
//
//   const frameByteLength = encodedFrame.data.byteLength
//   if (deltaOrKeyFrame) {
//     console.log('[CRYPTO OFFSET]: ', cryptoOffset)
//     console.log('[ENCODED FRAME TYPE]: ', frameType)
//     console.log('[ENCODED FRAME BYTES LENGTH]: ', frameByteLength)
//     console.log('[First Iteration]')
//   }
//
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < cryptoOffset && i < frameByteLength; ++i) {
//     const value = view.getInt8(i)
//     newView.setInt8(i, value)
//     if (deltaOrKeyFrame) {
//       console.log(`[]: ${i}=${value}`)
//     }
//   }
//
//   if (deltaOrKeyFrame) {
//     console.log('[Second Iteration]')
//   }
//   // eslint-disable-next-line no-plusplus
//   for (let i = cryptoOffset; i < frameByteLength; ++i) {
//     const value = 0
//     // if (crypto_key) {
//     //   value = +crypto_key
//     // }
//     const int8 = view.getInt8(i)
//     newView.setInt8(i, int8 + value)
//     if (deltaOrKeyFrame) {
//       console.log(`[]: ${i}=${int8}${value}`)
//     }
//   }
//
//   encodedFrame.data = newData
//   if (deltaOrKeyFrame) {
//     console.log('[ENCODE] result: ', encodedFrame.data)
//   }
//
//   controller.enqueue(encodedFrame)
// }
