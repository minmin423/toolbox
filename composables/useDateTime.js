export const useDateTime = () => {
    return useState('DateTime', () => new Date());
}