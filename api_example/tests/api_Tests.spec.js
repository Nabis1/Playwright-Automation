import { test, expect } from '@playwright/test'
import UsersAPI from '../pages/UsersAPI'
import usersResponse from '../API_test-data/usersResponse.json'
import { ClientRequest, request } from 'http'
import { resourceUsage } from 'process'

test.describe('API Verification with POM', () => {
  let usersAPI

  test('Verify user data for user ID 1', async ({ request }) => {
    usersAPI = new UsersAPI(request)
    await usersAPI.assertUser(1)

  })

  test('Verify all users on page 1', async ({ request }) => {
    usersAPI = new UsersAPI(request)
    await usersAPI.assertAllUsers()
    const response = await usersAPI.getAllUsers()
    expect(response).toEqual(usersResponse)
  })

  test('Verify POST request', async ({ request }) => {
    usersAPI = new UsersAPI(request)
    const newUser = {
      name: 'Midar Linrec',
      job: 'Tester in practice'
    }
    const responseData = await usersAPI.createUser(newUser)
    expect(responseData).toHaveProperty('name', newUser.name)
    expect(responseData).toHaveProperty('job', newUser.job)
    expect(responseData).toHaveProperty('id')
    expect(responseData).toHaveProperty('createdAt')

  })

  test(' Verify DELETE request', async ({request}) =>{
    usersAPI = new UsersAPI(request)
    const userIdToDelete = 1

    await usersAPI.assertUser(userIdToDelete)

    const statusCode = await usersAPI.deleteUser(userIdToDelete)
    expect(statusCode).toBe(204)


  })

  
})