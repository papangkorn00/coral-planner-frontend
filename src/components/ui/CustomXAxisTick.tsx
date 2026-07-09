export const CustomXAxisTick = ({
  x,
  y,
  payload,
}: {
  x: number
  y: number
  payload: {
    value: string
  }
}) => {
  const cropImage = `images/crops/${payload.value.toLowerCase().trim().replace(/\s+/g, ' ')}.png`  

  return (
    <g transform={`translate(${x},${y})`}>
      <image href={cropImage} x={-10} y={5} height={30} width={30} />
    </g>
  )
}
