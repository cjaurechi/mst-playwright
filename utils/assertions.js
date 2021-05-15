const expect = require("expect");

function assert(itemTitle, searchedItem) {
  expect(itemTitle).toEqual(
    expect.stringContaining(searchedItem.toLowerCase())
  );
  console.log(`The item title has "${searchedItem}" in it ✅
    
- Item title: ${itemTitle}
- Searched item: ${searchedItem}`);
}

module.exports = { assert };
