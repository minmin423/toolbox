export const useUserName = () => {
    let userName;
    if(process.client) userName = localStorage.getItem('userName');
    else userName = "";
    return useState('UserName', () => userName);
}