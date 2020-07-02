export const isEnrolled = (subArray, userId) => {
    return subArray.some(sub => sub.subscriber === userId)
  }
