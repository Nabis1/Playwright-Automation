import { expect } from '@playwright/test'

export default class UsersAPI {
  constructor(request) {
    this.request = request
    this.baseURL = 'https://reqres.in/api'
  }

  async getUserById(userId) {
    const response = await this.request.get(`${this.baseURL}/users/${userId}`)
    
    return response.json()
  }

  async getAllUsers() {
    const response = await this.request.get(`${this.baseURL}/users?page=1`)
    return response.json()

  }

  async createUser(userData) {
    const response = await this.request.post(`${this.baseURL}/users`, {
      data: userData,
    });
    return response.json()
  }

  async deleteUser(userId){
    const response = await this.request.delete(`${this.baseURL}/users/${userId}`)
    return response.status()
  }

  async assertUser(userId) {
    const response = await this.getUserById(userId)
    const userData = response.data 
    const expectedUser = {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg"
    }
    expect(userData).toEqual(expectedUser)
  }

  async assertAllUsers(){
    const response = await this.getAllUsers()
  }
}