const tryJson = async (response: Response) => {
  try {
    const json = await response.json()
    return JSON.stringify(json)
  } catch {
    return 'unparsable'
  }
}

export default tryJson
