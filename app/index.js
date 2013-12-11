'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


/**
 * This is our constructor function of the generator
 * @type {Function}
 */
var Generator = module.exports = function Generator(args, options, config) {
  /*
   With these two calls, we are inheriting functionality from both Base and NamedBase.
   That's how we were able to call that this.prompt function, as well as many others.
   */
  yeoman.generators.Base.apply(this, arguments);

  // creates a listener for the end event (when the methods on the prototype finish executing)
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  // gives us access to our generator's package.json file
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log('-------------------------------------------------');
  console.log('-- plista microsite - GENERATOR');
  console.log('-- author: cb@plista');
  console.log('-- ( if u have any question don\'t hesitate )');
  console.log('-------------------------------------------------');

  var prompts = [{
    name: 'clientName',
    message: 'what is the client name'
  },{
    name: 'campaignName',
    message: 'what is the campaign name'
  },{
    name: 'campaignId',
    message: 'what is the campaign id',
    default: 0
  }];

  this.prompt(prompts, function (props) {
    this.clientName = props.clientName || 'plista';
    this.campaignName = props.campaignName || 'microsite';
    this.campaignName = parseInt(props.campaignId, 10);
    cb();
  }.bind(this));
};

Generator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.mkdir('app/js');

  this.copy('../../templates/_package.json', 'package.json');
  this.copy('../../templates/_bower.json', 'bower.json');
  this.copy('../../templates/_Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype.projectfiles = function projectfiles() {
  this.copy('../../templates/editorconfig', '.editorconfig');
  this.copy('../../templates/jshintrc', '.jshintrc');
};
