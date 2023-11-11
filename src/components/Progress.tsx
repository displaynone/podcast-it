import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../colors';

type ProgressProps = {
  percent: number;
};

const Progress: FC<ProgressProps> = ({ percent }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.wrapper, width: `${percent}%` }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.lightGray,
    borderRadius: 5,
  },
  wrapper: {
    height: 24,
    backgroundColor: colors.orange,
    borderRadius: 3,
  },
});

export default Progress;
