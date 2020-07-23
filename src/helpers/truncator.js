export default function truncator(str, length) {
    var trimmedString = str.substr(0, length);
    return trimmedString + ".."
}