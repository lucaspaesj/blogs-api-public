const { User } = require('../../models');

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validateUser = async (body) => {
  if (body.displayName.length < 8) {
    return { type: 'INVALID_DISPLAY_NAME', 
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  if (!regexEmail.test(body.email)) {
    return { type: 'INVALID_EMAIL',
      message: '"email" must be a valid email',
    };
  }
  if (body.password.length < 6) {
    return { type: 'INVALID_PASSWORD',
      message: '"password" length must be at least 6 characters long',
    };
  }
  const user = await User.findOne({ where: { email: body.email } });
  if (user) return { type: 'ALREADY_REGISTERED', message: 'User already registered' };
  return { type: null, message: '' };
};

module.exports = validateUser;