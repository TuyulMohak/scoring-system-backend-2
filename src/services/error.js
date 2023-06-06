const errorObj = (err) => {
  return { status:err.status, message:err.message, completeError:err }
}

export { errorObj }