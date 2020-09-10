/**
 * 
 * @param {String} input 
 */

module.exports.isValidString = function (input) {
    return input !== '';
};

/**
 * 
 * @param {Number} input 
 */
module.exports.isValidNumber = function (input, min, max) {
        input = Number(input);
        if (input !== '' && !isNaN(input) && Number.isInteger(input)) {
            return (input < min || input > max) ? false : true;
        }
    
    
    return false;
};