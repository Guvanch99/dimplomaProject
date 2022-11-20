const constrainsFace = {
  audio: true,
  video: {
    width: {
      ideal: 1280,
      max: 1280

    },
    height: {
      ideal: 720,
      max: 720
    },
    frameRate: {
      max: 120,
      min: 30
    }
  },
  facingMode: { exact: 'user' }
}

export const initUserMedia = async (videoRef: any) => {
  try {
    const video = videoRef.current!
    const localStream = await navigator.mediaDevices.getUserMedia(constrainsFace)
    video.srcObject = localStream
    return localStream
  } catch (e) {
    console.log('initUserMedia', e)
    throw new Error(e as any)
  }
}
