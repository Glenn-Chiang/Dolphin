const getCurrentUser = () => {
  return Math.random() >= 0.5 ? 1 : 2
}

export {getCurrentUser}