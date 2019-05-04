function getModalStyle() {
    const top = 50
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      width: '70%',
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

export default getModalStyle()