import User from '../model/userSchema.js';
import bcrypt from 'bcryptjs';

export const userLogIn = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username });
        if(user) {
            const isMatch = await bcrypt.compare(request.body.password, user.password);
            if(isMatch) {
                return response.status(200).json(`${request.body.username} login successfull`);
            } else {
                return response.status(401).json('Invalid Login');
            }
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exists with this username'});
        }
        
        const user = request.body;
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(user.password)) {
            return response.status(400).json({ message: 'Password must be at least 8 chars long with 1 uppercase, 1 lowercase, 1 number, and 1 special character.' });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new User({ ...user, password: hashedPassword });
        await newUser.save();
        response.status(200).json({ mesage: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}



