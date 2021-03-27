import React from 'react';

export default function DenseTable() {
  return (
    <div>
      <div class="card-header">
          <h3>Recent Projects</h3>
          <button>See all <span class="las la-arrow-right"></span></button>
      </div>
      <div class="card-body">
          <div class="table-responsive">
              <table width="100%">
                  <thead>
                    <th>STT</th>
                    <th>Title</th>
                    <th>Avatar</th>
                    <th>Author</th>
                    <th>Date submitted</th>
                    <th>Status</th>
                    <th>Department</th>
                  </thead>
                  <tbody>
                      <tr>
                          <td>UI/UX Design</td>
                          <td>UI Team</td>
                          <td>
                              <span class="status purple"></span>
                              review
                          </td>
                          <td>UI Team</td>
                          <td>
                              <span class="status purple"></span>
                              review
                          </td>
                          <td>UI Team</td>
                          <td>
                              <span class="status purple"></span>
                              review
                          </td>
                      </tr>
                      <tr>
                          <td>Web development</td>
                          <td>Frontend</td>
                          <td>
                              <span class="status pink"></span>
                              in progress
                          </td>
                      </tr>
                      <tr>
                          <td>Ushop app</td>
                          <td>UI Team</td>
                          <td>
                              <span class="status orange"></span>
                              pending
                          </td>
                      </tr>
                      <tr>
                          <td>UI/UX Design</td>
                          <td>UI Team</td>
                          <td>
                              <span class="status purple"></span>
                              review
                          </td>
                      </tr>
                      <tr>
                          <td>Web development</td>
                          <td>Frontend</td>
                          <td>
                              <span class="status pink"></span>
                              in progress
                          </td>
                      </tr>
                      <tr>
                          <td>Ushop app</td>
                          <td>UI Team</td>
                          <td>
                              <span class="status orange"></span>
                              pending
                          </td>
                      </tr>
                  </tbody> 
              </table>
          </div>
      </div>
    </div>
  );
}
