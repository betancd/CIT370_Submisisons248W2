const bcrypt = require('bcryptjs');
const connection = require('../db-config');
const query = require('../utils/query');
const {
  GET_ME_BY_USER_ID,
  GET_ME_BY_USER_ID_WITH_PASSWORD,
  UPDATE_USER,
  INSERT_NEW_USER, // Ensure to use the correct query name
} = require('../queries/user.queries');

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Registering user:', { username, email, password }); // Debug statement

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword); // Debug statement

  try {
    const con = await connection();
    console.log('Database connection established'); // Debug statement

    const result = await query(con, INSERT_NEW_USER, [username, email, hashedPassword]);
    console.log('Query result:', result); // Debug statement

    if (result.affectedRows === 1) {
      res.json({ success: true, message: 'User registered successfully' });
    } else {
      res.status(500).json({ success: false, message: 'User registration failed' });
    }
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Other existing functions...
exports.getMe = async (req, res) => {
  const user = req.user;

  if (user.id) {
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, GET_ME_BY_USER_ID, [user.id]).catch((err) => {
      res.status(500).json({ msg: 'Could not find the user.' });
    });

    if (!user.length) {
      res.status(400).json({ msg: 'No user found.' });
    }
    res.status(200).send(user);
  }
};

exports.updateMe = async function (req, res) {
  const con = await connection().catch((err) => {
    throw err;
  });

  const user = await query(con, GET_ME_BY_USER_ID_WITH_PASSWORD, [req.user.id]).catch((err) => {
    res.status(500).json({ msg: 'Could not retrieve user.' });
  });

  const passwordUnchanged = await bcrypt.compare(req.body.password, user[0].password).catch((err) => {
    res.status(500).json({ msg: 'Invalid password!' });
  });

  if (!passwordUnchanged) {
    const passwordHash = bcrypt.hashSync(req.body.password);

    const result = await query(con, UPDATE_USER, [req.body.username, req.body.email, passwordHash, user[0].id]).catch((err) => {
      res.status(500).send({ msg: 'Could not update user settings.' });
    });

    if (result.affectedRows === 1) {
      res.json({ msg: 'Updated successfully!' });
    }
    res.json({ msg: 'Nothing to update...' });
  }
};
