const {test,expect} = require ('@playwright/test');


test('User Registration', async ({ page }) => {
  //check the homepage
  await page.goto('https://carshare.yomafleet.com/');
  await expect(page).toHaveTitle(/Yoma Car Share | Smart Self-Drive Car Rental Service/);
  await expect(page.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '#');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  //check the register type selection page
  await expect(page.getByText('I want to create a new account for my company')).toBeVisible();
  await expect(page.getByText('I want to join my company existing account')).toBeVisible();
  await page.getByText('I want to create a new account for my company').click();
  await page.getByRole('button', { name: 'Join Now' }).nth(1).click();
  //Check the registeration page
  await expect(page.getByText('Application Inquiry')).toBeVisible();
  
  //Check all input/select fields are visible
  
  await expect(page.getByText('Inquiry Type')).toBeVisible();
  await expect(page.getByText('Company Name')).toBeVisible();
  //await expect(page.getByText('Industry')).toBeVisible();

  await expect(page.getByLabel('Contact Person')).toBeVisible();
  await expect(page.getByLabel('Job Title')).toBeVisible();
    // The following locators were also improved for consistency:
  
  await expect(page.getByText('Phone Number')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  
  const submitButton = page.getByRole('button', { name: 'SUBMIT' });
  await expect(submitButton).toBeVisible();
  //Click the Submit Button without filling the fields
  
  await submitButton.click();

  // Verify all error messages are visible
  
  await expect(page.getByText('Please select type of inquiry.')).toBeVisible();
  await expect(page.getByText('Please enter company name.')).toBeVisible();
  await expect(page.getByText('Please select industry.')).toBeVisible();
  await expect(page.getByText('Please enter contact person.')).toBeVisible();
  await expect(page.getByText('The ext field is required.')).toBeVisible();
  await expect(page.getByText('Please enter valid phone number.')).toBeVisible();
  await expect(page.getByText('Please enter your email.')).toBeVisible();

  //Check the phone number validation
  await page.reload();
  await page.locator('id=national_number').fill('12');
  await expect(page.getByText('Please enter valid phone number.')).toBeVisible();
  await page.reload();
  await page.locator('id=national_number').fill('12121212121212');
  await expect(page.getByText('Please enter valid phone number.')).toBeVisible();

  //Check Email Validation
  await page.locator('id=email').fill('testuser');
  await expect(page.getByText('Please enter valid email address.')).toBeVisible();
  await page.reload();
  await page.locator('id=email').fill('testuser@gmail');
  await expect(page.getByText('Please enter valid email address.')).toBeVisible();

  //Fill out the form and submit successfully
  await page.locator('.select__input-container').first().click();
  await page.getByRole('option', { name: 'Add a new member' }).click();
  await page.locator('id=company_name').fill("QA");
  await page.locator('xpath=//*[@id="__next"]/main/div[3]/section[2]/form/div[2]/div[2]/div/div/div').click();
  await page.getByRole('option', { name:'Communications' , exact: true}).click();
  await page.locator('id=contact_person').fill("QA Tester");
  await page.locator('id=job_title').fill('Tester');
  await page.locator('xpath=//*[@id="__next"]/main/div[3]/section[2]/form/div[4]/div/div/div[1]/div/div').click();
  await page.getByRole('option', { name: '🇲🇲 MM (+95)' }).click();
  await page.locator('id=national_number').fill('09123456789');
  await page.locator('id=email').fill('testuser12@gmail.com');
  await page.getByRole('button', { name: 'SUBMIT' }).click();
  const okButton = successModal.locator('button', { hasText: 'OK' });
  await expect(okButton).toBeVisible();
  await okButton.click();
  await page.pause();
});

