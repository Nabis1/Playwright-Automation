import {test, expect } from "@playwright/test";
import users from "../test-data/usersResponse.json"

test.describe("API Verification examples", () =>{

  // 1) test to verify users endpoint is returning expected users
test("Verify multiple records returned against stored static response", async ({ request }) => {

  //save raw response into a variable 
  const response = await request.get("https://reqres.in/api/users?page=1")

  // parse the response body into JavaScript object with access to actual data within the response body
  const responseBody = await response.json()

  // check what is store inside
  // console.log(responseBody)

  expect(response.status()).toBe(200)
  expect(responseBody).toEqual(users)



})

  // 2) Test data for a single use line 
  test("Verify single user line by line", async ({ request }) => {


    const response = await request.get("https://reqres.in/api/users/1")

    const responseBody = await response.json()
    console.log(responseBody)
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.email).toBe('george.bluth@reqres.in')
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
    expect(responseBody.data.avatar).toBe('https://reqres.in/img/faces/1-image.jpg')








  })




})