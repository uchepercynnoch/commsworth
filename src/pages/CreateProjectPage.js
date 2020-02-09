import React, { Component, Fragment } from "react";
import * as Yup from "yup";
import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import { createProject } from "../actions/create.project.action";
import ProjectForm from "../components/ProjectForm";
import Title from "../components/Title";
const projectSchema = Yup.object().shape({
  title: Yup.string()
    .max(30, "Too long!")
    .required("Tile is required!"),
  budget: Yup.string()
    .max(10, "Budget is too short!")
    .required("Budget is required!"),
  contractorName: Yup.string()
    .max(30, "Contractor name is too long!")
    .required("Contractor name is required!"),
  contractorAddress: Yup.string()
    .max(50, "Contractor address is too long!")
    .required("Contractor address is is required!"),
  startDate: Yup.string().required("Please select start date"),
  endDate: Yup.string().required("Please select end date!")
});

class CreateProjectPage extends Component {
  state = {
    initialValues: {
      title: "",
      budget: "",
      contractorName: "",
      contractorAddress: "",
      startDate: "",
      endDate: ""
    }
  };

  handleCreateProject = data => {
    this.props.createProject(data);
  };
  render() {
    const { initialValues } = this.state;
    return (
      <Fragment>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto col-md-6 col-sm-4 my-5">
              <Title text="Create Project" />
            </div>
          </div>
          <div className="row">
            <div className="col-8 mx-auto col-md-6 col-sm-4 mb-1">
              {this.props.creatingProjects && (
                <strong>Creating project....</strong>
              )}
              {this.props.createdProjects && (
                <div className="alert alert-success">
                  Project created successfully
                </div>
              )}
              <ProjectForm
                projectSchema={projectSchema}
                initialValues={initialValues}
                handleCreateProject={this.handleCreateProject}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  creatingProjects: state.createProjectReducer.creatingProjects,
  createdProjects: state.createProjectReducer.createdProjects,
  errorCreatingProjects: state.createProjectReducer.errorCreatingProjects,
  fetchError: state.createProjectReducer.fetchError,
  message: state.createProjectReducer.message,
  status: state.createProjectReducer.status,
  error: state.createProjectReducer.error
});
export default connect(mapStateToProps, { createProject })(CreateProjectPage);
