import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from './Table';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
    search: '',
    columns: [],
    rows: [],
  };

  buildUrl(entity, search, base = 'http://localhost:30562/') {
    return `${base}${entity}${search ? '?search=' : ''}${search || ''}`;
  }

  async handleResult(index = 0) {
    const rows = await this.download(index);
    const columns = this.props.columns[index];
    console.log(this.props, index);

    this.setState({
      ...this.state,
      rows,
      columns,
    })
  }

  async download(index = 0) {
    const urls = ['book', 'reader'];
    const url = this.buildUrl(urls[index], this.search);
    const result = await fetch(url);
    return result.json();
  }

  handleChange = async (event, index) => {
    await this.setState({ value: index });
    this.handleResult(index);
  };

  render() {
    const { classes } = this.props;
    const { value, columns, rows } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Книги" href="#books"/>
            <Tab label="Читатели" href="#readers"/>
          </Tabs>
        </AppBar>
        <Table columns={columns} rows={rows}/>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

SimpleTabs.defaultProps = {
  columns: [
    [
      {
        name: 'code',
        title: 'Код',
      },
      {
        name: 'author',
        title: 'автор',
      },
      {
        name: 'name',
        title: 'Название',
      },
      {
        name: 'publisher',
        title: 'Издатель',
      },
      {
        name: 'published_at',
        title: 'Год',
      },
      {
        name: 'pages',
        title: 'Страниц',
      },
      {
        name: 'topic',
        title: 'Тема',
      },
      {
        name: 'costs',
        title: 'Стоимость',
      },
    ],
    [{
      name: 'last_name',
      title: 'Фамилия',
    },
    {
      name: 'first_name',
      title: 'Имя',
    },
    {
      name: 'middle_name',
      title: 'Отчество',
    },
    {
      name: 'address',
      title: 'Адрес',
    },
    {
      name: 'home_phone',
      title: 'Домашний телефон',
    },
    {
      name: 'work_phone',
      title: 'Рабочий телефон',
    }]
  ],
}

export default withStyles(styles)(SimpleTabs);
