# Description

Change method useEffect to useCallBack and pass it to add and remove favorites only to avoid multiple  GET request of favorites when page loads

Fixes: [MC-1071](https://dcsgcloud.atlassian.net/browse/MC-1071)

## Type of Change

- [x] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

# How Did I Test This Change?

- Go to any PLP or SRLP page
- Check network tab
- Search for detail request
- detail request should not load more than twice.

# How Can Someone Test & Validate This?

Please provide details on how to enable any feature flags. Delete if feature is not behind a flag. Provide any necessary explanation on how to test experience.
```javascript
  window.skuFavoritesEnabled=true;
  document.dispatchEvent(new CustomEvent('WindowFlagsEvent'));
```
or via url
```
?skuFavoritesEnabled=true
```
# Checklist:

- [x] My code follows Homefield
- [x] My code follows DSG's Engineering Excellence guide - https://engineering.pages.dcsg.com/
- [x] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
- [x] I have added this write-up to the original Jira ticket

# Evidence & Screenshots of Feature or Bug Resolved
![Screenshot 2024-03-11 190202](https://github.com/dsg-tech/search-calia-navigation/assets/143839041/9dae11dc-1c6c-4998-8eeb-c526b6a51269)
