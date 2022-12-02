const adminUser = {
  email: 'admin@admin.com',
  password: 'secret_admin'
};

const userWithInvalidEmail = {
  email: 'test@test.com',
  password: 'secret_admin'
};

const userWithInvalidPassword = {
  email: 'admin@admin.com',
  password: 'test'

};

const userFromDatabase = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export { 
  adminUser, 
  userWithInvalidEmail, 
  userWithInvalidPassword, 
  userFromDatabase 
};