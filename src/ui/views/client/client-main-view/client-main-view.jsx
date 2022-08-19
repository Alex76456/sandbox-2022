

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {t} from '@utils/translations'

import {ClientMainViewModel} from './client-main-view.model'
import {styles} from './client-main-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MAIN

@observer
class ClientMainViewRaw extends Component {
  viewModel = new ClientMainViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    // this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      onTriggerDrawer,
    } = this.viewModel
    const {classes: classNames} = this.props
 
    

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Inventory)}>
            <MainContent>
              <div/>
            </MainContent>
          </Appbar>
        </Main>
        
      </React.Fragment>
    )
  }
}

export const ClientMainView = withStyles(styles)(ClientMainViewRaw)
