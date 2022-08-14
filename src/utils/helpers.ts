export const money = (value: string | number) => {
  let num = 0

  // if (typeof value === 'number') {
  //   num = value
  // } else {
  //   num = Number(value)
  // }

  // return (num || 0).toLocaleString('pt-BR', {
  //   style: 'currency',
  //   currency: 'BRL',
  // })

  if (typeof value === 'number') {
    num = value
  } else {
    num = Number(value)
  }

  return `R$ ${num}`
}
