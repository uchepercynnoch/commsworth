import React, { Component, Fragment } from "react";
import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import { loadProjects } from "../actions/load.projects.action";
import Title from "../components/Title";
class LoadProjectPage extends Component {
  componentDidMount() {
    this.props.loadProjects();
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="row">
          <div className="col-8 mx-auto col-md-6 col-sm-4 my-2">
            <Title text="Projects" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="mx-auto mt-5">
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <caption>List of projects</caption>
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Contractor Name</th>
                      <th scope="col">Contractor Address</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.loadingProjects && (
                      <strong className="text-center">
                        Loading projects...
                      </strong>
                    )}
                    {this.props.projects !== null
                      ? this.props.projects.map(project => (
                          <tr key={project.id}>
                            <td>{project.title}</td>
                            <td>{project.budget}</td>
                            <td>{project.contractorName}</td>
                            <td>{project.contractorAddress}</td>
                            <td>{project.startDate}</td>
                            <td>{project.endDate}</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loadingProjects: state.loadProjectsReducer.loadingProjects,
  loadedProjects: state.loadProjectsReducer.loadedProjects,
  errorLoadingProjects: state.loadProjectsReducer.errorLoadingProjects,
  requestError: state.loadProjectsReducer.requestError,
  projects: state.loadProjectsReducer.projects,
  error: state.loadProjectsReducer.error
});
export default connect(mapStateToProps, { loadProjects })(LoadProjectPage);
