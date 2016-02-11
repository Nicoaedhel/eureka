var jade = require('jade'),
	express = require('express'),
	app = express();

app.use('/static', express.static('public'));
 
app.get('/', function (req, res) {
  jade.renderFile('templates/index.jade', {text:"texte"}, function (err, html) {
    if (err) throw err;
    res.end(html)
  });
});
 
app.listen(3000);

console.log('Server running at http://localhost:3000/');