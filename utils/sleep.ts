function sleep(duration: number): Promise<void> {
  return new Promise(function (resolve, _reject) {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

export { sleep }
