import { test, expect } from '@playwright/test'
import UsersAPI from '../pages/UsersAPI'
import usersResponse from '../API_test-data/usersResponse.json' 

test.describe('API Verification with POM', () => {
  let usersAPI

  test('Verify user data for user ID 1', async ({ request }) => {
    usersAPI = new UsersAPI(request)
    await usersAPI.assertUser(1)
    
  })

  test('Verify all users on page 1', async ({request}) => {
    usersAPI = new UsersAPI(request)
    await usersAPI.assertAllUsers()
    const response = await usersAPI.getAllUsers()
    expect(response).toEqual(usersResponse)
  })
})