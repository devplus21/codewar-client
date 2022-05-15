import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_EXERCISE } from 'graphql/Queries';
import moment from 'moment';
import Button from 'components/Button';
import UpdateProblem from './UpdateProblem';
import { Link } from 'react-router-dom';
import { UPDATE_PROBLEM } from 'graphql/Mutation';

const ListProblem = () => {
  let { loading, error, data } = useQuery(GET_ALL_EXERCISE);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;
  console.log(data);
  return (
    <div className="problem">
      <div className="problem_container">
        <div className="problem_head">
          <div className="problem_head_title">
            <span>Danh sách bài tập</span>
          </div>
        </div>

        <div className="problem_option">
          <div className="problem_option_panel"></div>
        </div>

        <div className="problem_content">
          <div className="problem_content_table">
            <div className="problem_content_table_header">
              <table className="table">
                <colgroup>
                  <col width="40" />
                  <col width="120" />
                  <col width="300" />
                  <col width="150" />
                  <col width="300" />
                  <col width="200" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="table_header">
                      <div className="table_cell">
                        <span> </span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Tiêu đề</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Độ khó</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Chủ đề</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Cập nhật lúc</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span> </span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="problem_content_table_body">
              <table className="table">
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="300" />
                  <col width="150" />
                  <col width="300" />
                  <col width="200" />
                </colgroup>
                <tbody className="table_body">
                  {data?.exercises.map((item, index) => (
                    <TableRow key={index} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ data }) => {
  const { id, name, des, level, topic, updatedAt } = data;
  const displayID = id.substr(0, 8).toUpperCase();
  const [show, setShow] = useState(false);
  const [problemItem, setItem] = useState();
  let levelName = '';
  let levelColor = '';
  switch (level) {
    case 1:
      levelName = 'Dễ';
      levelColor = 'green';
      break;
    case 2:
      levelName = 'Trung bình';
      levelColor = 'blue';
      break;
    case 3:
      levelName = 'Khó';
      levelColor = 'orange';
      break;
    default:
      break;
  }

  const [removeProblem] = useMutation(UPDATE_PROBLEM);
  const handleListRemove = () => {
    removeProblem({
      variables: { problemId: id, name, des, level, topic, updatedAt },
      onCompleted: () => {
        alert('Xóa thành công');
      },
      onError: (error) => {
        alert(error.message);
      },
      refetchQueries: [GET_ALL_EXERCISE],
    });
  };
  return (
    <tr className="table_row">
      <td></td>
      <td>
        <div className="table_cell">{displayID}</div>
      </td>
      <td>
        <div className="table_cell">{name}</div>
      </td>
      <td>
        <div className="table_cell">
          <div className={`tag bg-${levelColor}`}>
            <span>{levelName}</span>
          </div>
        </div>
      </td>
      <td>
        <div className="table_cell">
          {topic.map((item, index) => (
            <div key={index} className="tag topic">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </td>
      <td>
        <div className="table_cell">
          <span>{moment(updatedAt).format('DD/MM/YYYY - HH:MM:ss')}</span>
        </div>
      </td>
      <td>
        <div className="table_cell tool">
          <Button
            backgroundColor="green"
            onClick={() => {
              setItem(id, name, des, level, topic, updatedAt);
            }}
          >
            <i className="bx bxs-edit"></i>
          </Button>
          <Button backgroundColor="red" onClick={() => handleListRemove(id)}>
            <i className="bx bxs-trash-alt"></i>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ListProblem;
