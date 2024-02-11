const User =require( '../models/user')
const JWT = require('jsonwebtoken')
    

exports.singup=(req,res) =>{
    const user=new User(
        req.body
    );
    user.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        res.send(user)
    })
}


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Verify the password
        if (!user.authenticate(password)) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Create a JWT token with userID and role
        const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

        // Set the token in a cookie
        res.cookie('token', token, { expire: new Date() + 9999 });

        // Return the token and user data
        return res.json({ token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.signout = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');

    // Respond with a JSON indicating the user has signed out
    res.json({ message: 'Signout successful' });
};