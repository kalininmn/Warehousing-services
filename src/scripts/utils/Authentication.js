class Authentication {
  static async checkAuthenticated() {
    const isAuthenticated = await fetch('/authentication', { method: 'GET'});
    return isAuthenticated.json(); 
  }
}