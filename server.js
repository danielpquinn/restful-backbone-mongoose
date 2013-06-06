/*global console */
/*jslint sloppy: true, indent: 2 */

var fs = require('fs'),
  express = require('express'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Framework,
  FrameworkModel,
  app = module.exports = express();

// Connect to db
mongoose.connect('mongodb://localhost/frameworks');

app.use(express.methodOverride());
app.use(express.bodyParser());

Framework = new Schema({
  title: {type: String, required: true, default: 'Framework name'},
  url: {type: String, required: true, default: 'Framework url.'}
});

FrameworkModel = mongoose.model('Framework', Framework);

// Serve static files
app.use('/', express.static('./client'));

app.get('/api/frameworks', function (req, res) {
  return FrameworkModel.find(function (err, frameworks) {
    if (!err) {
      return res.send(frameworks);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/frameworks', function (req, res) {
  var framework = new FrameworkModel({
    title: req.body.title,
    url: req.body.url
  });
  framework.save(function (err) {
    if (!err) {
      return console.log('created');
    } else {
      return console.log(err);
    }
  });
  return res.send(framework);
});

app.get('/api/frameworks/:id', function (req, res) {
  return FrameworkModel.findById(req.params.id, function (err, framework) {
    if (!err) {
      return res.send(framework);
    } else {
      return console.log(err);
    }
  });
});

app.put('/api/frameworks/:id', function (req, res) {
  return FrameworkModel.findById(req.params.id, function (err, framework) {
    framework.title = req.body.title;
    framework.url = req.body.url;
    return framework.save(function (err) {
      if (!err) {
        return res.send(framework);
      } else {
        return console.log(err);
      }
    });
  });
});

app.delete('/api/frameworks/:id', function (req, res) {
  return FrameworkModel.findById(req.params.id, function (err, framework) {
    return framework.remove(function (err) {
      if (!err) {
        return console.log('removed');
      } else {
        return console.log(err);
      }
    });
  });
});

// Ensure all routes go home, client side app..
app.get('*', function (req, res) {
  fs.createReadStream('./client/index.html').pipe(res);
});

app.listen(3000);