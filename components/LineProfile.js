import Card from "react-bootstrap/Card";
import React from "react";

const LineProfile = React.memo((props) => {
  const { profile } = props;
  console.log(`render LineProfile.`);

  return (
    <div>
      {profile && (
        <Card style={{ width: "18rem" }}>
          <Card.Img src={profile.pictureUrl} />
          <Card.Body>
            <Card.Title>{profile.displayName}</Card.Title>
            <Card.Text>{profile.statusMessage}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
});

export default LineProfile;
