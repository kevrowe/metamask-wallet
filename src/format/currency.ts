export const formatHex = (hexValue: string) => {
    return (parseInt(hexValue) / 1000000000000000000).toFixed(2)
}