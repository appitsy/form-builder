import React from 'react';
import styled from '@emotion/styled';

interface ComponentEditorProps {

}

const StyledDiv = styled.div`
  position: relative;
  &:hover {
    .appitsy-component-edit-display {
      filter: blur(2px);
    }

    .appitsy-component-edit-actions {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        margin: 0px 10px;
      }
    }
  }

  .appitsy-component-edit-actions {
    display: none;
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
`;

const Actions = styled.div``;

const ComponentEditor: React.FC<ComponentEditorProps> = (props) => {
  return (
    <StyledDiv>
      <div className='appitsy-component-edit-display'>
        { props.children }
      </div>
      <Actions className='appitsy-component-edit-actions'>
        {/* <Button name='edit' type='button' display={{ leftIcon: 'pen' }} onClick={editComponent} text='Edit' style='info'></Button>
        <Button name='edit' type='button' display={{ leftIcon: 'trash' }} onClick={removeComponent} text='Remove' style='danger'></Button> */}
      </Actions>
    </StyledDiv>
  );
}

export default ComponentEditor;
