import { Request, Response, NextFunction } from 'express';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const userNameRegex = /^[a-zA-Z0-9_]{3,30}$/;
const nameRegex = /^[A-Za-z\s]{1,50}$/;

export const userRegistrationValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, user_name, name, role } = req.body;
  

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }

  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, one number, and one special character' });
    return;
  }

 
  if (!userNameRegex.test(user_name)) {
    res.status(400).json({ message: 'Username must be between 3-30 characters and only contain alphanumeric characters and underscores' });
    return;
  }
  if (!nameRegex.test(name)) {
    res.status(400).json({ message: 'Name must only contain letters and spaces, and be between 1-50 characters' });
    return;
  }

  next();
};
