export default function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
