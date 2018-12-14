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
    const urls = ['catalog', 'manufactorers', 'ports', 'levels'];
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
            <Tab label="Каталог" href="#books"/>
            <Tab label="Производители" href="#manufactorers"/>
            <Tab label="Порты" href="#ports"/>
            <Tab label="Уровни" href="#levels"/>
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

SimpleTabs.defaultProps = {
  columns: [
    [{
      name: 'id',
      title: 'Номер',
    },
    {
      name: 'manufactorer',
      title: 'Производитель',
    },
    {
      name: 'model',
      title: 'Модель',
    },
    {
      name: 'level',
      title: 'Уровень',
    },
    {
      name: 'info',
      title: 'Информация',
    },
    { name: '10Gigabit Ethernet' },
    { name: 'Gigabit Ethernet' },
    { name: 'Fast Ethernet' },
    { name: 'SFP' },
    { name: 'SFP+' },
    { name: 'комбинированный' },
    { name: 'USB' },
    { name: 'microUSB' },
    { name: 'RS-232' },
    { name: 'UART' },
    { name: 'последовательный порт консоли RJ-45' },
    { name: 'порт RJ-45 для внешнего управления' },
    { name: 'слот модуля стекирования' },
    {
      name: 'costs',
      title: 'Стоимость',
    },
    {
      name: 'input_volts',
      title: 'Напряжение питания',
    }],
    [{
      name: 'id',
      title: 'Номер',
    },
    {
      name: 'name',
      title: 'Название',
    }],
    [{
      name: 'id',
      title: 'Номер',
    },
    {
      name: 'name',
      title: 'Название',
    }],
    [{
      name: 'id',
      title: 'Номер',
    },
    {
      name: 'name',
      title: 'Название',
    }]
  ],
}


export default withStyles(styles)(SimpleTabs);
