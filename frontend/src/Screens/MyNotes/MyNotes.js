import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import notes from "d:/MERN/Note Zipper/frontend/src/data/notes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure for ?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  /*
  const fetchNotes = async () => {
    const data = await axios.get("/api/notes");
    console.log(data);
  };
  */
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
    //fetchNotes();
  }, [
    dispatch,
    userInfo,
    successCreate,
    successUpdate,
    navigate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome ${userInfo.name}..`}>
      <Link to="/createnotes">
        <Button
          style={{ marginleft: 10, marginBottom: 6 }}
          size="lg"
          variant="outline-primary"
        >
          Create Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes?.reverse().map((note) => (
        <Accordion defaultActiveKey={note._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Header as={Card.Text} variant="link" eventkey="0">
                  {note.title}
                </Accordion.Header>
              </span>
              <div>
                <Button href={`/notes/${note._id}`} variant="dark">
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body eventKey="0">
              <Card.Body>
                <h4>
                  <Badge bg="warning">Category - {note.category}</Badge>
                </h4>

                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created on{" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
