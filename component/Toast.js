import { useToast } from 'native-base';

const Toast = () => {
    const toast = useToast();
    return <Center>
        <Button onPress={() => toast.show({
        description: "Hello world"
      })}>
          Show Toast
        </Button>
      </Center>;
  };
export default Toast