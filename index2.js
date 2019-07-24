import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Up from '@material-ui/icons/ArrowDropUp';
import Down from '@material-ui/icons/ArrowDropDown';
import { TextField, IconButton } from '@material-ui/core/es';
import Input from '@material-ui/core/Input';
import axios from "axios";
import { JSONViewer } from 'react-json-editor-viewer';

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column'
  },
  dialog: {
    textAlign: 'center',
    backgroundColor: '#e9effd',
    borderBottom: '1px solid #dcdcdc',
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 9,
    minWidth: 120,
  },
  margin: {
    margin: theme.spacing.unit,
  },

  select: {
    width: '100%',
  },
  dialogModal: {
    "&>div": {
      borderRadius: '0px',
    }
  },
  iconWraper: {
    marginLeft: 2,
    marginRight: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '24px',
    height: '24px',
    background: '#00aeac',
    padding: ' 2px',
    borderRadius: '30px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  commderLine: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 20px 15px 20px',
    border: ' 1px dotted',
    marginBottom: '10px',
    wordBreak: 'break-all',
  },
  commderRequest: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '50px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%",
  },
  textFieldHeader: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '25%',
  },
  button: {
    margin: theme.spacing.unit,
    width: 160,
  },
  addHeaderLink: {
    margin: theme.spacing.unit,
    color: 'blue',
    width: 135,
    fontSize: 12,
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
      color: '#00aeac',

    }
  },
  fontStyle: {
    fontSize: '1rem'
  },
  fontShow: {
    fontSize: '1.2rem'
  },
  meanContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  tipper: {
    minWidth: '20px',
    background: '#00aeac',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '18px',
    color: 'white',
    alignItems: 'center',
    fontWeight: '800',
    padding: '5px',
  },
  ResultTipper: {
    minWidth: '80px',
    background: '#00aeac',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '18px',
    color: 'white',
    alignItems: 'center',
    fontWeight: '800',
    padding: '5px',
    height: '40px'
  },
  bodyArea: {
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    border: ' 1px dotted',
  },
  addButton: {
    background: '#00aeac',
    color: 'white',
    margin: '10px',
    // width: '60%'
  },
  bottomDiv: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 15,
    justifyContent: 'flex-end'
  }
});
class ApiTesterBody extends React.Component {
  state = {
    open: true,
    type: '',
    requestBuilder: [{ type: 'GET', url: '', show: true, header: [], body: '' }],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  generateCurl = async (requ, header,ind) => {
    const {requestBuilder} =this.state
    var updated = requestBuilder
    if (requ.type === 'POST') {
      var data = await axios.post(requ.url, requ.body, { headers: header, }).then(res => res).catch(err => err)
      console.log(data, 'generateWithCurl')
      updated[ind][`response`] = data
     this.setState({ requestBuilder: updated })
      return data;
    }
    if (requ.type === 'PUT') {
      var data = await axios.put(requ.url, requ.body, { headers: header, }).then(res => res).catch(err => err)
      console.log(data, 'generateWithCurl')
      updated[ind][`response`] = data
     this.setState({ requestBuilder: updated })
      return data;
    }
    if (requ.type === 'DELETE') {
      if (requ.body !== '') {
        var data = await axios.delete(requ.url, requ.body, { headers: header, }).then(res => res).catch(err => err)
        console.log(data, 'generateWithCurl')
      updated[ind][`response`] = data
    this.setState({ requestBuilder: updated })
        return data;
      } else {
        var data = await axios.delete(requ.url, { headers: header, }).then(res => res).catch(err => err)
        console.log(data, 'generateWithCurl', header)
      updated[ind][`response`] = data
     this.setState({ requestBuilder: updated })
      return data;
      }
    }
    if (requ.type === 'GET') {
      var data = await axios.get(requ.url, { headers: header, }).then(res => res).catch(err => err)
      console.log(data, 'generateWithCurl', header)
      updated[ind][`response`] = data
     this.setState({ requestBuilder: updated })
      return data;
    }
    // let headers = requ.header.map((req) => req.name && req.value && `-H '${req.name}: ${req.value}'`);
    // if(requ.type === 'POST' || requ.type === 'PUT'){
    //   return `curl -X${requ.type} ${headers ? headers.join(' ') : ''} ${requ.body.length ? `-d '${requ.body.trim()}'`:'' } '${requ.url.trim()}'`.replace(/\s\s+/g, ' ');
    // }
    // else {
    //   return `curl -X${requ.type} ${headers ? headers.join(' ') : ''} '${requ.url.trim()}'`.replace(/\s\s+/g, ' ');;
    // }
  };

  generateBuilder = () => {
    const { requestBuilder } = this.state;
    const { actionFunctions } = this.props;
    // let generateWithCurl = requestBuilder.map((reques, ind) => {
    //   reques.curl = this.generateCurl(reques);
    //   return reques;
    // });
    let generateWithCurl = requestBuilder.map((reques, ind) => {
      var obj = {}
      var header = reques.header ? Object.keys(reques.header).map(ab => obj[reques.header[ab].name] = reques.header[ab].value) : {}
      return this.generateCurl(reques, obj,ind);
    });
    console.log(generateWithCurl, 'generateWithCurl')
  };
  saveCurl = () => {
    this.setState({ open: false });
    this.generateBuilder();

  };

  handleClose = () => {
    this.setState({ open: false });

  };

  handleChange = (event, R_Index, name, RH_index, FORHEADER) => {
    const { requestBuilder } = this.state
    if (FORHEADER) {
      var updated = requestBuilder
      updated[R_Index][name] = event.target.value
      this.setState({ requestBuilder: updated })
    } else {
      var updated = requestBuilder
      updated[R_Index].header[RH_index][name] = event.target.value
      this.setState({ requestBuilder: updated })
    }
  };
  handleAddHeader = () => {
    const { requestBuilder } = this.state
    var updated = requestBuilder
    updated.push({ type: 'GET', url: '', show: true, header: [], body: '' })
    this.setState({ requestBuilder: updated })
  }
  handleDelete = (R_Index, RH_index, FORHEADER) => {
    const { requestBuilder } = this.state
    if (FORHEADER) {
      var updated = requestBuilder.filter((HD, i) => i !== R_Index)
      this.setState({ requestBuilder: updated })
    } else {
      var newUpdateHeader = requestBuilder[R_Index].header.filter((HD, i) => i !== RH_index)
      var updated = requestBuilder
      updated[R_Index].header = newUpdateHeader
      this.setState({ requestBuilder: updated })
    }
  }
  addHeaders = (R_Index) => {
    const { requestBuilder } = this.state
    var updated = requestBuilder
    updated[R_Index]['header'].push({ name: '', value: '' })
    this.setState({ requestBuilder: updated })
  }
  handleShow = (show, R_Index) => {
    const { requestBuilder } = this.state
    var updated = requestBuilder
    updated[R_Index]['show'] = !show
    this.setState({ requestBuilder: updated })
  }
  render() {
    const { classes } = this.props
    const { requestBuilder } = this.state
    console.log(requestBuilder)
    return (
      <div
        className={classes.root}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
      >
        {/* <DialogTitle id="alert-dialog-title">CURL Request Builder</DialogTitle> */}
        <div style={{
          padding: '0 24px', overflowY: 'auto',
          maxHeight: 'calc(100vh - 425px)',
        }}>
          {requestBuilder && requestBuilder.length > 0 ? requestBuilder.map((MRT, index) => (
            <div className={classes.meanContainer}>
              <div className={classes.tipper}>{index + 1}</div>
              <div className={classes.commderLine}>
                <div className={classes.commderRequest}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={MRT.type}
                      onChange={(e) => this.handleChange(e, index, 'type', '', true)}
                      inputProps={{
                        name: 'type',
                        id: 'type-simple',
                      }}
                    >
                      <MenuItem value={'POST'}>POST</MenuItem>
                      <MenuItem value={'GET'}>GET</MenuItem>
                      <MenuItem value={'PUT'}>PUT</MenuItem>
                      <MenuItem value={'DELETE'}>DELETE</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    id="standard-bare"
                    placeholder="URL*"
                    value={MRT.url}
                    className={classes.textField}
                    onChange={(e) => this.handleChange(e, index, 'url', '', true)}
                    margin="normal"
                  />
                  <DeleteIcon fontSize="small" style={{ padding: 4, background: 'red' }} onClick={() => this.handleDelete(index, '', true)} className={classes.iconWraper} />
                  {MRT.show ? <Up onClick={(e) => this.handleShow(MRT.show, index)} fontSize="small" className={classes.iconWraper} /> : <Down onClick={(e) => this.handleShow(MRT.show, index)} fontSize="small" className={classes.iconWraper} />}
                </div>
                {MRT.show && (MRT.type === 'POST' || MRT.type === 'PUT') &&
                  <div className={classes.bodyArea}>
                    <Input
                      id="outlined-multiline-flexible"
                      placeholder="body"
                      multiline
                      fullWidth
                      rowsMax="5"
                      rows='5'
                      value={MRT.body}
                      onChange={(e) => this.handleChange(e, index, 'body', '', true)}
                      variant="outlined"
                    />
                  </div>
                }
                {MRT.show && <p className={classes.addHeaderLink} onClick={() => this.addHeaders(index)} >+ Add Request Header</p>}
                {MRT.show ? MRT.header && MRT.header.map((MRTH, Hindex) => (<div className={classes.commderRequest}>

                  <DeleteIcon fontSize="small" style={{ padding: 4, background: 'red' }} className={classes.iconWraper} onClick={() => this.handleDelete(index, Hindex, false)} />
                  <TextField
                    id="standard-bare"
                    placeholder="Name"
                    value={MRTH.name}
                    className={classes.textFieldHeader}
                    onChange={(e) => this.handleChange(e, index, 'name', Hindex, false)}
                  />
                  <TextField
                    id="standard-bare"
                    value={MRTH.value}
                    placeholder="Value"
                    className={classes.textFieldHeader}
                    onChange={(e) => this.handleChange(e, index, 'value', Hindex, false)}
                  />
                </div>)) : ''}
                {MRT.response&&<div className={classes.meanContainer}>
                  <div className={classes.ResultTipper}>Result</div>
                  <div className={classes.commderLine} style={{padding:'5px 20px 5px 20px', flexDirection: 'row',display:'grid',gridTemplateColumns:'5% 95%'}} >
                   <span style={{padding:'3px 0px'}}> Data:</span>
                   <JSONViewer
                      data={MRT.response}
                      collapsible
                    />
                  </div>
                </div>}
              </div>
            </div>)) : <div className={classes.commderLine}>Please Create New Request</div>}



        </div>
        <div className={classes.bottomDiv}>
          <Button variant="contained" className={classes.addButton} onClick={this.handleAddHeader}>
            Add New Request
          </Button>
          <Button variant="contained" onClick={this.saveCurl} className={classes.addButton} autoFocus>
            Test Api`s
            </Button>
        </div>
        {/* <DialogActions>
            <Button variant="outlined" onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" onClick={this.saveCurl} color="secondary" autoFocus>
              Done
            </Button>
          </DialogActions> */}
        {/* </Dialog> */}
      </div>
    );
  }
}

export default withStyles(styles)(ApiTesterBody);
