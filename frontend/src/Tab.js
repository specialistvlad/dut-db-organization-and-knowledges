import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Table from './Table';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

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

  async handleResult(index = 0, search) {
    const rows = await this.download(index, search);
    const columns = this.props.columns[index];

    this.setState({
      ...this.state,
      rows,
      columns,
    })
  }

  async download(index = 0, search) {
    const urls = ['book', 'reader', 'issue'];
    const url = this.buildUrl(urls[index], search);
    const result = await fetch(url);
    return result.json();
  }

  handleChangeTab = async (event, index) => {
    await this.setState({ value: index });
    this.handleResult(index);
  };

  componentDidMount = async () => {
    this.handleResult();
  };

  handleChangeInput = async (event) => {
    this.handleResult(this.state.value, event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { value, columns, rows } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChangeTab}>
            <Tab label="Книги" href="#books"/>
            <Tab label="Читатели" href="#readers"/>
            <Tab label="Выдача книг" href="#issue"/>
          </Tabs>

        </AppBar>
          <Input
          id="input-with-icon-adornment"
          onChange={this.handleChangeInput}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
        <Table columns={columns} rows={rows}/>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const telFormatter = (val) => `+${val}`;
const dateFormatter = (date) => (new Date(date)).toISOString().slice(0,10);

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
      formatter: telFormatter,
    },
    {
      name: 'work_phone',
      title: 'Рабочий телефон',
      formatter: telFormatter,
    }],
    [{
      name: 'code',
      title: 'инвентарный номер книги',
    },
    {
      name: 'id',
      title: 'номер читательского билета',
    },
    {
      name: 'created_at',
      title: 'дата выдачи',
      formatter: dateFormatter,
    },
    {
      name: 'return_at',
      title: 'запланированная дата возврата',
      formatter: dateFormatter,
    },
  ]
  ],
}

export default withStyles(styles)(SimpleTabs);
