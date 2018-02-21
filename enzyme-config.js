var Enzyme = require('enzyme');
var EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({
    adapter: new EnzymeAdapter()
})