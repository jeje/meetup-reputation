import Organizations from '../services/organizations'
import Logger from 'logplease'

export default {
  install: function (Vue) {
    Logger.setLogLevel('INFO')

    const logger = Logger.create('AppPlugin')

    logger.warn('Environment:', process.env.NODE_ENV)

    logger.info('Installing application services ...')
    Organizations.init()

    logger.info('Application services installed ...')
    Vue.prototype.$organizations = Organizations

    logger.info('Application services registered...')
  }
}
