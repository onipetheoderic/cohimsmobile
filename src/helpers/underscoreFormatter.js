export default function underscoreFormatter(str){
    let new_str = str.toUpperCase();
    return new_str.replace(/_/g, ' ');
}