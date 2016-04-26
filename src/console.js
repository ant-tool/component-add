import colors from 'colors/safe';

function log() {
  console.log(colors.green(...arguments));
}

function error() {
  console.error(colors.red(...arguments));
}

function warn() {
  console.warn(colors.yellow(...arguments));
}

function info() {
  console.info(colors.yellow(...arguments));
}

export default { log, error, warn, info };
