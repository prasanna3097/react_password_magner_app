import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'red', 'blue']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    latestList: [],
    isShow: false,
    isTrue: false,
  }

  latestWebsite = event => {
    this.setState({website: event.target.value})
  }

  latestUsername = event => {
    this.setState({username: event.target.value})
  }

  latestPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const colorsValue = colorList[Math.floor(Math.random() * 5)]

    const newList = {
      id: v4(),
      websiteName: website,
      userName: username,
      Password: password,
      initialValue: initial,
      classAdd: colorsValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newList],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    this.setState({latestList: newList})
  }

  render() {
    const {
      username,
      website,
      latestList,
      password,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />
        <div className="add-password-container">
          <div className="form-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-small-img"
            />

            <from className="form-inputs-container" onSubmit={this.addContent}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-holder">
                <img
                  className="input-logos"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.latestWebsite}
                  value={website}
                />
              </div>
              <div className="input-holder">
                <img
                  className="input-logos"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.latestUsername}
                  value={username}
                />
              </div>
              <div className="input-holder">
                <img
                  className="input-logos"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.latestPassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </from>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-large-img"
          />
        </div>
        <div className="your-password-container">
          <div className="your-password-search-container">
            <h1 className="password-text">
              Your Passwords
              <span className="count">{newList.length}</span>
            </h1>

            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="check-box-container">
            <input type="checkbox" id="check" onClick={this.showPassword} />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p>{eachValue.websiteName}</p>
                    <p>{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                    {isShow && <p className="password">{eachValue.Password}</p>}
                  </div>
                  <button
                    className="bel-btn"
                    type="button"
                    data-testid="delete"
                    onClick={() => this.deleteItem(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
