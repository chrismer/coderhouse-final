import os from 'os'
import yargs from 'yargs'

const args = yargs(process.argv.slice(2)).default({
  port: 8080,
  mode: 'fork'
}).argv

function getInfo(_req, res) {
    const info = {
      args: JSON.stringify(args, null, 2),
      execPath: process.execPath,
      platform: process.platform,
      pid: process.pid,
      version: process.version,
      projectPath: process.cwd(),
      rss: JSON.stringify(process.memoryUsage(), null, 2),
      cpus: os.cpus().length
    }
    


    res.json(info)
  }


  export{getInfo}