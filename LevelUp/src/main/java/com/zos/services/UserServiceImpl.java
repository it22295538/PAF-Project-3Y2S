package com.zos.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.zos.dto.UserDto;
import com.zos.exception.UserException;
import com.zos.model.User;
import com.zos.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) throws UserException {
        return userRepository.save(user);
    }

    @Override
    public User findUserById(Integer userId) throws UserException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found"));
    }

    @Override
    public User findUserProfile(String token) throws UserException {
        // Dummy implementation (replace with actual token decoding)
        return new User(); // or throw new UserException("Not implemented");
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserException("Username not found"));
    }

    @Override
    public String followUser(Integer reqUserId, Integer followUserId) throws UserException {
        return "Followed user with ID " + followUserId;
    }

    @Override
    public String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException {
        return "Unfollowed user with ID " + unfollowUserId;
    }

    @Override
    public List<User> findUsersByUserIds(List<Integer> userIds) {
        return userRepository.findAllById(userIds);
    }

    @Override
    public List<User> searchUser(String query) throws UserException {
        return new ArrayList<>(); // Placeholder
    }

    @Override
    public List<User> popularUser() {
        return new ArrayList<>(); // Placeholder
    }

    @Override
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException {
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        return userRepository.save(existingUser);
    }
}
